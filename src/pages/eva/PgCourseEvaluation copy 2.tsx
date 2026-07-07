import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useUserStore } from '../../utils/authService';
const { REACT_APP_API_URL } = import.meta.env;

function PgCourseEvaluation() {
  const { user } = useUserStore(state => state);
  const [courses, setCourses] = useState([]);
  const [staff, setStaff] = useState([]);
  const [questions, setQuestions] = useState<any[]>([]);
  const [options, setOptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
     courseId: "",
     staffNo: "",
     indexno: user?.user?.tag,
     sessionId: "",
     responses: {} as Record<string, string>,
  });

  const [courseSearch, setCourseSearch] = useState('');
  const [lecturerSearch, setLecturerSearch] = useState('');
  const [showCourseOptions, setShowCourseOptions] = useState(false);
  const [showLecturerOptions, setShowLecturerOptions] = useState(false);

  // Multi-course evaluation state
  const [selectedCourses, setSelectedCourses] = useState<any[]>([]);
  const [evalCourses, setEvalCourses] = useState<any[]>([]);
  const [currentCourseIndex, setCurrentCourseIndex] = useState(0);
  const [courseEvaluations, setCourseEvaluations] = useState<Record<string, any>>({});
  const [completedCourses, setCompletedCourses] = useState<Set<string>>(new Set());

  // Fetch dropdown data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ coursesRes, staffRes, questionsRes, optionsRes,formsRes ] = await Promise.all([
          fetch(`${REACT_APP_API_URL}/eva/courses`),
          fetch(`${REACT_APP_API_URL}/eva/staff`),
          fetch(`${REACT_APP_API_URL}/eva/questions`),
          fetch(`${REACT_APP_API_URL}/eva/options`),
          fetch(`${REACT_APP_API_URL}/eva/data/${encodeURIComponent(user?.user?.tag)}`),
        ]);

        // if (coursesRes.ok) setCourses(await coursesRes.json());
        if (coursesRes.ok) setCourses(await coursesRes.json());
        if (staffRes.ok) setStaff(await staffRes.json());
        if (questionsRes.ok) setQuestions(await questionsRes.json());
        if (optionsRes.ok) setOptions(await optionsRes.json());
        if (formsRes.ok) setEvalCourses(await formsRes.json())
         
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
    addCourses()
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Multi-course evaluation functions
  const addCourses = () => {
    evalCourses.map(( course ) => {
      if (!selectedCourses.find(c => c.id === course.id) ) {
        setSelectedCourses(prev => [...prev, course]);
        setCourseEvaluations(prev => ({
          ...prev,
          [course.id]: {
            courseId: course.id,
            staffNo: "",
            responses: {}
          }
        }));
      }
    })
    alert(setSelectedCourses.length)
    setCourseSearch('');
    setShowCourseOptions(false);
  };

  const addCourse = (course: any) => {
    if (!selectedCourses.find(c => c.id === course.id)) {
      setSelectedCourses(prev => [...prev, course]);
      setCourseEvaluations(prev => ({
        ...prev,
        [course.id]: {
          courseId: course.id,
          staffNo: "",
          responses: {}
        }
      }));
    }
    setCourseSearch('');
    setShowCourseOptions(false);
  };

  const removeCourse = (courseId: string) => {
    setSelectedCourses(prev => prev.filter(c => c.id !== courseId));
    setCourseEvaluations(prev => {
      const newEvaluations = { ...prev };
      delete newEvaluations[courseId];
      return newEvaluations;
    });
    setCompletedCourses(prev => {
      const newCompleted = new Set(prev);
      newCompleted.delete(courseId);
      return newCompleted;
    });

    // Adjust current course index if needed
    if (currentCourseIndex >= selectedCourses.length - 1) {
      setCurrentCourseIndex(Math.max(0, selectedCourses.length - 2));
    }
  };

  const switchToCourse = (index: number) => {
    setCurrentCourseIndex(index);
    const course = selectedCourses[index];
    if (course && courseEvaluations[course.id]) {
      setFormData({
        courseId: course.id,
        staffNo: courseEvaluations[course.id].staffNo || "",
        indexno: formData.indexno,
        sessionId: formData.sessionId,
        responses: courseEvaluations[course.id].responses || {}
      });
      setLecturerSearch(courseEvaluations[course.id].staffNo ?
        (staff as any[]).find((s: any) => s.staffNo === courseEvaluations[course.id].staffNo)?.name || "" : "");
    }
  };

  const saveCurrentCourseEvaluation = () => {
    if (selectedCourses[currentCourseIndex]) {
      const courseId = selectedCourses[currentCourseIndex].id;
      setCourseEvaluations(prev => ({
        ...prev,
        [courseId]: {
          courseId,
          staffNo: formData.staffNo,
          responses: formData.responses
        }
      }));
    }
  };

  const markCourseAsCompleted = (courseId: string) => {
    setCompletedCourses(prev => new Set([...prev, courseId]));
  };

  const handleRadioChange = (questionId: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      responses: { ...prev.responses, [questionId.toString()]: value }
    }));

    // Auto-save current course evaluation when answers change
    setTimeout(() => {
      if (selectedCourses[currentCourseIndex]) {
        const courseId = selectedCourses[currentCourseIndex].id;
        setCourseEvaluations(prev => ({
          ...prev,
          [courseId]: {
            courseId,
            staffNo: formData.staffNo,
            responses: { ...formData.responses, [questionId.toString()]: value }
          }
        }));
      }
    }, 500); // Debounce auto-save
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCourses.length === 0) {
      toast.error("Please add at least one course to evaluate");
      return;
    }
    // Save current course evaluation before submitting
    saveCurrentCourseEvaluation();
    // Validate all selected courses have required data
    const incompleteCourses = selectedCourses.filter(course => {
      const evaluation = courseEvaluations[course.id];
      if (!evaluation || !evaluation.staffNo) return true;
      const unanswered = questions.filter(q => !evaluation.responses[q.id.toString()]);
      return unanswered.length > 0;
    });

    if (incompleteCourses.length > 0) {
      toast.error(`Please complete evaluations for: ${incompleteCourses.map(c => c.title).join(', ')}`);
      return;
    }

    try {
      // Submit all course evaluations
      const submissionPromises = selectedCourses.map(async (course) => {
        const evaluation = courseEvaluations[course.id];
        return fetch(`${REACT_APP_API_URL}/eva/evaluations`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            courseId: evaluation.courseId,
            staffNo: evaluation.staffNo,
            indexno: formData.indexno,
            sessionId: formData.sessionId,
            responses: evaluation.responses
          })
        });
      });

      const responses = await Promise.all(submissionPromises);
      const failedCount = responses.filter(r => !r.ok).length;

      if (failedCount === 0) {
        toast.success(`All ${selectedCourses.length} course evaluations submitted successfully!`);

        // Mark all courses as completed
        selectedCourses.forEach(course => {
          markCourseAsCompleted(course.id);
        });

        // Reset form
        setFormData({
          courseId: "",
          staffNo: "",
          indexno: "",
          sessionId: "",
          responses: {},
        });
        setSelectedCourses([]);
        setCourseEvaluations({});
        setCompletedCourses(new Set());
        setCurrentCourseIndex(0);
      } else {
        toast.error(`${failedCount} evaluation(s) failed to submit. Please try again.`);
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to submit evaluations");
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
        {/* Course Selection */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Add Courses to Evaluate
            </label>
            <div className="relative">
              <input
                type="text"
                value={courseSearch}
                onChange={(e) => setCourseSearch(e.target.value)}
                onFocus={() => setShowCourseOptions(true)}
                placeholder={loading ? "Loading courses..." : "Search courses to add..."}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
              {showCourseOptions && courseSearch && (
                <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {courses.filter((course: any) => course.title.toLowerCase().includes(courseSearch.toLowerCase()) || course.id.toString().toLowerCase().includes(courseSearch.toLowerCase())).map((course: any) => (
                    <div
                      key={course.id}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                      onClick={() => addCourse(course)}
                    >
                      <span>{course.title} - ({course.id})</span>
                      <span className="text-xs text-gray-500">Click to add</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Selected Courses List */}
          {selectedCourses.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-3">Selected Courses ({selectedCourses.length})</h3>
              <div className="space-y-2">
                {selectedCourses.map((course, index) => (
                  <div key={course.id} className={`flex items-center justify-between p-3 border rounded-md ${currentCourseIndex === index ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}>
                    <div className="flex items-center space-x-3">
                      <button
                        type="button"
                        onClick={() => switchToCourse(index)}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        {course.title} - ({course.id})
                      </button>
                      { completedCourses.has(course.id) && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          ✓ Completed
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeCourse(course.id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Current Course Evaluation */}
        {selectedCourses.length > 0 && (
          <div className="border-t pt-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Evaluating: {selectedCourses[currentCourseIndex]?.title} - ({selectedCourses[currentCourseIndex]?.id})
              </h2>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  Course {currentCourseIndex + 1} of {selectedCourses.length}
                </span>
                {currentCourseIndex > 0 && (
                  <button
                    type="button"
                    onClick={() => switchToCourse(currentCourseIndex - 1)}
                    className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded"
                  >
                    Previous
                  </button>
                )}
                {currentCourseIndex < selectedCourses.length - 1 && (
                  <button
                    type="button"
                    onClick={() => switchToCourse(currentCourseIndex + 1)}
                    className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
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
          </div>
        )}

        

        {/* Questions - Only show when courses are selected */}
        { selectedCourses.length > 0 && Object.entries(groupedQuestions).map(([category, categoryQuestions]) => (
          <div key={category} className="px-6 py-3 border rounded-xl space-y-6 ">
            <h2 className="text-lg font-roboto font-semibold text-primary/80 border-b pb-2 uppercase">{category}</h2>
            { categoryQuestions.map((question: any) => (
              <div key={question.id} className="space-y-3">
                <p className="text-primary-dark font-medium">{question.orderNum}. {question.question}</p>
                {question.type === 'likert' ? (
                  <div className="flex flex-wrap gap-4">
                    {options.map((option: any) => (
                      <label key={option.id} className="flex items-center space-x-2 cursor-pointer italic">
                        <input
                          type="radio"
                          name={`question-${question.id}`}
                          value={option.option}
                          checked={formData.responses[question.id.toString()] === option.option}
                          onChange={() => handleRadioChange(question.id, option.option)}
                          className="w-4 h-4 text-primary-accent focus:ring-primary-accent"
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
            )) }
          </div>
        ))}


        {/* Action Buttons */}
        <div className="text-center space-y-4">
          {selectedCourses.length > 0 && (
            <div className="flex justify-center space-x-4">
              <button
                type="button"
                onClick={saveCurrentCourseEvaluation}
                className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-6 rounded-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Save Current Course
              </button>
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Submit All Evaluations ({selectedCourses.length} courses)
              </button>
            </div>
          )}

          {/* Progress Summary */}
          {selectedCourses.length > 0 && (
            <div className="text-sm text-gray-600">
              Progress: {completedCourses.size} of {selectedCourses.length} courses completed
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-green-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(completedCourses.size / selectedCourses.length) * 100}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default PgCourseEvaluation;