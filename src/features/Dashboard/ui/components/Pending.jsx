import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

function Pending() {
  const { allQuestions } = useSelector((store) => store.questionSlice);
  const [pending, setPending] = useState([]);

  const [category, setCategory] = useState(null);

  const [value, setValue] = useState("");

  const reuse = () => {
    const pendingQuestions = allQuestions.filter((qs) => {
      return qs.status === "Pending";
    });

    return pendingQuestions;
  };

  useEffect(() => {
    const pendingQuestions = reuse();
    setPending(pendingQuestions);
  }, [allQuestions]);

  useEffect(() => {
    const interval = setTimeout(() => {
      const arr = category
        ? allQuestions.filter((qs) => {
            return (
              qs.question.toLowerCase().includes(value.toLowerCase()) &&
              qs.status === "Pending" &&
              qs.category === category
            );
          })
        : allQuestions.filter((qs) => {
            return (
              qs.question.toLowerCase().includes(value.toLowerCase()) &&
              qs.status === "Pending"
            );
          });

      setPending(arr);
    }, 700);

    return () => {
      clearTimeout(interval);
    };
  }, [value]);

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-950">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
        {/* Header */}
        <header className="mb-8">
          <button
            onClick={() => navigate("/")}
            className="mb-6 flex items-center gap-2 text-sm font-medium text-zinc-500 transition hover:text-zinc-950"
          >
            <span className="text-base">←</span>
            Back
          </button>

          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2 text-xs text-zinc-400">
                <span>Practice</span>
                <span>/</span>
                <span className="font-medium text-zinc-900">Pending</span>
              </div>

              <h1 className="text-4xl font-semibold tracking-[-0.045em]">
                Pending Questions
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-500">
                Questions that still need your attention and practice.
              </p>
            </div>

            <div className="border border-zinc-200 bg-white px-5 py-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-400">
                Pending
              </p>

              <p className="mt-1 text-2xl font-semibold tracking-[-0.04em]">
                {
                  allQuestions.filter((qs) => {
                    return qs.status === "Pending";
                  }).length
                }
              </p>
            </div>
          </div>
        </header>

        {/* Toolbar */}
        <div className="mb-5 flex flex-col gap-3 border-y border-zinc-200 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-sm">
            <input
              onChange={(e) => {
                setValue(e.target.value);
              }}
              value={value}
              type="text"
              placeholder="Search pending questions..."
              className="h-11 w-full border border-zinc-300 bg-white px-4 text-sm outline-none placeholder:text-zinc-400 focus:border-zinc-950"
            />
          </div>

          <select
            onChange={(e) => {
              const value = e.target.value;
              if (value === "all") {
                const pendingQuestions = reuse();
                setPending(pendingQuestions);
                setCategory(null);
                return;
              }

              const category = allQuestions.filter((qs) => {
                return qs.category === value && qs.status === "Pending";
              });
              setCategory(value);
              setPending(category);
            }}
            className="h-11 border border-zinc-300 bg-white px-4 text-sm font-medium text-zinc-700 outline-none focus:border-zinc-950"
          >
            <option value={"all"}>All Categories</option>
            <option value={"DSA"}>DSA</option>
            <option value={"Git"}>Git</option>
            <option value={"Technical Interview"}>Technical</option>
            <option value={"Machine Coding"}>Machine Coding</option>
          </select>
        </div>

        {/* Questions */}
        <div className="overflow-hidden border border-zinc-200 bg-white">
          {/* Table Header */}
          <div className="hidden border-b border-zinc-200 bg-zinc-50 px-6 py-3 md:grid md:grid-cols-[1fr_120px_110px] md:items-center md:gap-5">
            <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-zinc-500">
              Question
            </span>

            <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-zinc-500">
              Category
            </span>

            <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-zinc-500">
              Difficulty
            </span>
          </div>

          {pending.length > 0 ? (
            pending.map((qs, index) => {
              return (
                <div
                  key={qs?._id || index}
                  className="border-b border-zinc-200 px-5 py-5 transition hover:bg-zinc-50 sm:px-6"
                >
                  <div className="grid gap-4 md:grid-cols-[1fr_120px_110px] md:items-center md:gap-5">
                    <div className="flex items-start gap-4">
                      <span className="mt-0.5 text-xs font-medium text-zinc-400">
                        {index + 1}
                      </span>

                      <div>
                        <h3 className="text-base font-semibold tracking-[-0.015em]">
                          {qs?.question}
                        </h3>
                      </div>
                    </div>

                    <span className="w-fit border border-zinc-300 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700">
                      {qs?.category}
                    </span>

                    <span className="w-fit text-xs font-medium text-zinc-500">
                      {qs?.difficulty}
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="px-6 py-16 text-center">
              <h3 className="text-lg font-semibold">Nothing found</h3>
              <p className="mt-2 text-sm text-zinc-500">
                No questions match your current search or filters.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-5 flex flex-col gap-3 text-xs text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
          <span>Showing pending questions</span>
        </div>
      </div>
    </div>
  );
}

export default Pending;
