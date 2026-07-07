import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
const { REACT_APP_API_URL } = import.meta.env;

function PgCourseEvaluation() {
  const [courses, setCourses] = useState([]);
  const [staff, setStaff] = useState([]);
  const [questions, setQuestions] = useState<any[]>([]);
  const [options, setOptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
     courseId: "",
     staffNo: "",
     indexno: "",
     sessionId: "",
     responses: {} as Record<string, string>,
  });

  const [courseSearch, setCourseSearch] = useState('');
  const [lecturerSearch, setLecturerSearch] = useState('');
  const [showCourseOptions, setShowCourseOptions] = useState(false);
  const [showLecturerOptions, setShowLecturerOptions] = useState(false);

  // Fetch dropdown data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ coursesRes, staffRes, questionsRes, optionsRes ] = await Promise.all([
          fetch(`${REACT_APP_API_URL}/eva/courses`),
          fetch(`${REACT_APP_API_URL}/eva/staff`),
          fetch(`${REACT_APP_API_URL}/eva/questions`),
          fetch(`${REACT_APP_API_URL}/eva/options`)
        ]);

        if (coursesRes.ok) setCourses(await coursesRes.json());
        if (staffRes.ok) setStaff(await staffRes.json());
        if (questionsRes.ok) setQuestions(await questionsRes.json());
        if (optionsRes.ok) setOptions(await optionsRes.json());
        // if (!coursesRes.ok || !staffRes.ok || !questionsRes.ok) {
        //   toast.error("Failed to load some data");
        // }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (questionId: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      responses: { ...prev.responses, [questionId.toString()]: value }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.courseId) {
      toast.error("Please select a course");
      return;
    }

    // Check if all questions are answered
    const unanswered = questions.filter(q => !formData.responses[q.id.toString()]);
    if (unanswered.length > 0) {
      toast.error("Please answer all questions");
      return;
    }

    try {
      const response = await fetch('/api/eva/evaluations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId: formData.courseId,
          staffNo: formData.staffNo,
          indexno: formData.indexno,
          sessionId: formData.sessionId,
          responses: formData.responses
        })
      });

      if (response.ok) {
        toast.success("Evaluation submitted successfully!");
        // Reset form
        setFormData({
          courseId: "",
          staffNo: "",
          indexno: "",
          sessionId: "",
          responses: {},
        });
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to submit evaluation");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to submit evaluation");
    }
  };

  // Start tracking when required fields are filled (now handled by submitEvaluation)
  useEffect(() => {
    // Tracking is now handled automatically when submitting the evaluation
    // No separate tracking API call needed
  }, [formData.courseId]);

  const groupedQuestions = questions.reduce((acc: Record<string, any[]>, q: any) => {
    if (!acc[q.category]) acc[q.category] = [];
    acc[q.category].push(q);
    return acc;
  }, {});

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Student Course Evaluation
      </h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Course Information */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Course
            </label>
            <div className="relative">
              <input
                type="text"
                value={courseSearch}
                onChange={(e) => setCourseSearch(e.target.value)}
                onFocus={() => setShowCourseOptions(true)}
                placeholder={loading ? "Loading courses..." : "Search and select a course"}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
                required
              />
              {showCourseOptions && courseSearch && (
                <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {courses.filter((course: any) => course.title.toLowerCase().includes(courseSearch.toLowerCase()) || course.id.toString().toLowerCase().includes(courseSearch.toLowerCase())).map((course: any) => (
                    <div
                      key={course.id}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, courseId: course.id }));
                        setCourseSearch(`${course.title} - (${course.id})`);
                        setShowCourseOptions(false);
                      }}
                    >
                      {course.title} - ({course.id})
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Lecturer
            </label>
            <div className="relative">
              <input
                type="text"
                value={lecturerSearch}
                onChange={(e) => setLecturerSearch(e.target.value)}
                onFocus={() => setShowLecturerOptions(true)}
                placeholder={loading ? "Loading staff..." : "Search and select a lecturer"}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
              {showLecturerOptions && lecturerSearch && (
                <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {staff.filter((member: any) => member.name.toLowerCase().includes(lecturerSearch.toLowerCase()) || member.staffNo.toString().toLowerCase().includes(lecturerSearch.toLowerCase())).map((member: any) => (
                    <div
                      key={member.staffNo}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, staffNo: member.staffNo }));
                        setLecturerSearch(member.name);
                        setShowLecturerOptions(false);
                      }}
                    >
                      {member.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        

        {/* Questions */}
        {Object.entries(groupedQuestions).map(([category, categoryQuestions]) => (
          <div key={category} className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">
              {category}
            </h2>
            {categoryQuestions.map((question: any) => (
              <div key={question.id} className="space-y-3">
                <p className="text-gray-700 font-medium">{question.question}</p>
                {question.type === 'likert' ? (
                  <div className="flex flex-wrap gap-4">
                    {options.map((option: any) => (
                      <label key={option.id} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name={`question-${question.id}`}
                          value={option.option}
                          checked={formData.responses[question.id.toString()] === option.option}
                          onChange={() => handleRadioChange(question.id, option.option)}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{option.option}</span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <textarea
                    name={`question-${question.id}`}
                    value={formData.responses[question.id.toString()] || ""}
                    onChange={(e) => handleRadioChange(question.id, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="Your answer..."
                  />
                )}
              </div>
            ))}
          </div>
        ))}


        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit Evaluation
          </button>
        </div>
      </form>
    </div>
  );
}

export default PgCourseEvaluation;