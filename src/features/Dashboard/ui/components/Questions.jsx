import { useSelector } from "react-redux";
import { updateAllPages, visibilityUpdate } from "../../state/dashboardState";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { updatePageAndQuestions } from "../../state/dashboardState";
import { useNavigate } from "react-router";
import { questionUpdate, update } from "../../../Question/state/questionState";
const Questions = () => {
  const { visibleQuestion, limit, allPages, page } = useSelector(
    (store) => store.dashboardSlice,
  );
  const { allQuestions } = useSelector((store) => store.questionSlice);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    category: "",
    status: "",
    difficulty: "",
  });

  const [visible, setVisible] = useState([]);

  const [value, setValue] = useState();

  useEffect(() => {
    dispatch(updateAllPages(allQuestions.length / limit));
  }, [allQuestions]);

  useEffect(() => {
    setVisible([...visibleQuestion]);
  }, [visibleQuestion]);

  useEffect(() => {
    if (!value && value !== "") return;

    const interval = setTimeout(() => {
      const arr = visibleQuestion.filter((qs) => {
        return qs.question.toLowerCase().includes(value.toLowerCase());
      });

      setVisible(arr);
    }, 700);

    return () => {
      clearTimeout(interval);
    };
  }, [value]);

  useEffect(() => {
    dispatch(dispatch(updatePageAndQuestions(0)));
  }, []);

  const handleChange = (id, value) => {
    const updateStatus = [...allQuestions].map((qs) => {
      return qs.id === id ? { ...qs, status: value } : qs;
    });

    const updateVisible = [...visibleQuestion].map((qs) => {
      return qs.id === id ? { ...qs, status: value } : qs;
    });

    dispatch(visibilityUpdate(updateVisible));
    dispatch(questionUpdate(updateStatus));
    setVisible(updateVisible);
    localStorage.setItem("questions", JSON.stringify(updateStatus));
  };

  const handleDelete = (id) => {
    const updatedArr = allQuestions.filter((qs, index) => {
      return qs.id !== id;
    });

    console.log(updatedArr);

    dispatch(questionUpdate(updatedArr));
    localStorage.setItem("questions", JSON.stringify(updatedArr));
  };

  const handleUpdate = (id) => {
    const data = [...allQuestions].find((qs) => {
      return qs.id === id;
    });

    if (data) {
      dispatch(update(data));
      navigate("/add-question");
    }
  };

  const filtering = (value, cre) => {
    if (value === "all") {
      dispatch(updatePageAndQuestions(page));
      setCredentials({ ...credentials, [cre]: "" });
      return;
    }

    const arr = visibleQuestion.filter((qs) => {
      return qs[cre] === value;
    });

    setCredentials({ ...credentials, [cre]: value });
    setVisible(arr);
  };

  return (
    <div className="min-h-screen bg-[#f6f6f4] text-zinc-950">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-10">
        {/* Header */}
        <header className="mb-8">
          <button
            onClick={() => navigate("/")}
            className="mb-5 flex items-center gap-2 text-sm font-medium text-zinc-500 transition hover:text-zinc-950"
          >
            <span>←</span>
            Back
          </button>

          <div className="mb-4 flex items-center gap-2 text-xs text-zinc-500">
            <span className="font-medium text-zinc-900">Practice</span>
            <span className="text-zinc-300">/</span>
            <span>Questions</span>
          </div>

          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-4xl font-semibold tracking-[-0.045em]">
                All Questions
              </h1>

              <p className="mt-2 text-sm text-zinc-500">
                Review and manage everything you’ve practiced.
              </p>
            </div>

            <button
              onClick={() => navigate("/add-question")}
              className="w-fit bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
            >
              + Add question
            </button>
          </div>
        </header>

        {/* Main */}
        <section className="overflow-hidden border border-zinc-300 bg-white shadow-[0_10px_35px_-25px_rgba(0,0,0,0.35)]">
          {/* Filters */}
          <div className="border-b border-zinc-200 bg-[#fafaf9] p-4 sm:p-5">
            <div className="flex flex-col gap-3 lg:flex-row">
              {/* Search */}
              <div className="relative flex-1">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base text-zinc-400">
                  ⌕
                </span>

                <input
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  type="text"
                  placeholder="Search questions..."
                  className="h-11 w-full border border-zinc-300 bg-white px-10 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 transition focus:border-zinc-900"
                />
              </div>

              <select
                onChange={(e) => {
                  const value = e.target.value;

                  filtering(value, "category");
                }}
                className="h-11 border border-zinc-300 bg-white px-4 text-sm text-zinc-700 outline-none focus:border-zinc-900"
              >
                <option value={"all"}>All categories</option>
                <option value={"DSA"}>DSA</option>
                <option value={"Git"}>Git</option>
                <option value={"Technical Interview"}>Technical</option>
                <option value={"Machine Coding"}>Machine Coding</option>
              </select>

              <select
                onChange={(e) => {
                  const value = e.target.value;
                  filtering(value, "difficulty");
                }}
                className="h-11 border border-zinc-300 bg-white px-4 text-sm text-zinc-700 outline-none focus:border-zinc-900"
              >
                <option value={"all"}>All difficulty</option>
                <option value={"Easy"}>Easy</option>
                <option value={"Medium"}>Medium</option>
                <option value={"Hard"}>Hard</option>
              </select>

              <select
                onChange={(e) => {
                  const value = e.target.value;

                  filtering(value, "status");
                }}
                className="h-11 border border-zinc-300 bg-white px-4 text-sm text-zinc-700 outline-none focus:border-zinc-900"
              >
                <option value={"all"}>All status</option>
                <option value={"Pending"}>Pending</option>
                <option value={"In Progress"}>In Progress</option>
                <option value={"Complete"}>Complete</option>
              </select>
            </div>
          </div>

          {/* Results Bar */}
          <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4 sm:px-6">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">
                {allQuestions.length} Questions
              </span>

              <span className="border border-zinc-200 bg-zinc-50 px-2 py-1 text-[11px] text-zinc-500">
                All
              </span>
            </div>
          </div>

          {/* Table Header */}
          <div className="hidden border-b border-zinc-200 bg-zinc-50 px-6 py-3 md:grid md:grid-cols-[1fr_110px_100px_120px_80px_80px_130px] md:items-center md:gap-4">
            <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-zinc-500">
              Question
            </span>

            <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-zinc-500">
              Category
            </span>

            <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-zinc-500">
              Difficulty
            </span>

            <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-zinc-500">
              Status
            </span>

            <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-zinc-500">
              Update
            </span>

            <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-zinc-500">
              Delete
            </span>

            <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-zinc-500">
              Change Status
            </span>
          </div>

          {visible.length > 0 ? (
            visible.map((qs, index) => {
              return (
                <div
                  key={index}
                  className="border-b border-zinc-200 px-5 py-5 transition hover:bg-zinc-50 sm:px-6"
                >
                  <div className="grid gap-5 md:grid-cols-[1fr_110px_100px_120px_80px_80px_130px] md:items-center md:gap-4">
                    {/* Question */}
                    <div className="flex items-start gap-4">
                      <span className="mt-0.5 text-xs font-medium text-zinc-400">
                        0{index + 1}
                      </span>

                      <div>
                        <h3 className="text-base font-semibold tracking-[-0.015em]">
                          {qs.question}
                        </h3>
                      </div>
                    </div>

                    {/* Category */}
                    <span className="w-fit border border-zinc-300 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700">
                      {qs.category}
                    </span>

                    {/* Difficulty */}
                    <span className="w-fit text-xs font-medium text-zinc-500">
                      {qs.difficulty}
                    </span>

                    {/* Current Status */}
                    <span className="w-fit bg-zinc-950 px-3 py-1.5 text-xs font-medium text-white">
                      {qs.status}
                    </span>

                    {/* Update */}
                    <button
                      onClick={() => handleUpdate(qs.id)}
                      className="w-fit border border-zinc-300 bg-white px-3 py-2 text-xs font-medium text-zinc-700 transition hover:border-zinc-950 hover:text-zinc-950"
                    >
                      Update
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(qs.id)}
                      className="w-fit border border-zinc-300 bg-white px-3 py-2 text-xs font-medium text-red-600 transition hover:border-red-600"
                    >
                      Delete
                    </button>

                    {/* Change Status */}
                    <select
                      onChange={(e) => {
                        handleChange(qs.id, e.target.value);
                      }}
                      className="h-9 w-fit border border-zinc-300 bg-white px-2 text-xs font-medium text-zinc-700 outline-none focus:border-zinc-950"
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Complete">Complete</option>
                    </select>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="px-6 py-16 text-center">
              <h3 className="text-lg font-semibold text-zinc-950">
                No questions found
              </h3>
              <p className="mt-2 text-sm text-zinc-500">
                No questions match your current search or filters.
              </p>
            </div>
          )}

          {/* Pagination */}
          <div className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="flex items-center gap-1.5">
              {page - 1 >= 0 && (
                <button
                  onClick={() => {
                    dispatch(updatePageAndQuestions(page - 1));
                  }}
                  className="border border-zinc-300 bg-white px-3 py-2 text-xs text-zinc-400"
                >
                  ←
                </button>
              )}

              {new Array(Math.ceil(allPages)).fill(0).map((_, index) => {
                return (
                  <button
                    key={index}
                    onClick={() => dispatch(updatePageAndQuestions(index))}
                    className={`px-3 py-2 text-xs font-medium ${
                      page === index
                        ? "bg-zinc-950 text-white"
                        : "border border-zinc-200 bg-white text-zinc-600"
                    }`}
                  >
                    {index + 1}
                  </button>
                );
              })}

              {page + 1 < allPages && (
                <button
                  onClick={() => {
                    dispatch(updatePageAndQuestions(page + 1));
                  }}
                  className="border border-zinc-300 bg-white px-3 py-2 text-xs text-zinc-600 hover:bg-zinc-50"
                >
                  →
                </button>
              )}
            </div>
          </div>
        </section>

        <div className="mt-5 flex items-center justify-between text-xs text-zinc-400">
          <span>Interview Practice Tracker</span>
          <span>{allQuestions.length} questions tracked</span>
        </div>
      </div>
    </div>
  );
};

export default Questions;
