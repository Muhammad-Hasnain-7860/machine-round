import useQuestion from "../../hooks/useQuestion";
import { update } from "../../state/questionState";

const AddQuestion = () => {
  const {
    register,
    handleSubmit,
    onError,
    handleAddQuestion,
    setCredentials,
    credentials,
    navigate,
    dispatch
  } = useQuestion();

  return (
    <div className="min-h-screen bg-[#f7f7f5] px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-[760px]">

        {/* Top */}
        <div className="mb-8">
          <button
            type="button"
            onClick={() => {
              navigate('/')
              dispatch(update(null))
            }}
            className="mb-7 flex items-center gap-2 text-sm font-medium text-zinc-500 transition hover:text-zinc-950"
          >
            <span className="text-lg leading-none">←</span>
            Back
          </button>

          <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
            <span>Practice</span>
            <span>/</span>
            <span className="text-zinc-700">Question Library</span>
          </div>

          <h1 className="text-3xl font-semibold tracking-[-0.045em] text-zinc-950 sm:text-[38px]">
            Add a question
          </h1>

          <p className="mt-2 max-w-lg text-[15px] leading-6 text-zinc-500">
            Keep track of what you’ve practiced and build your interview
            preparation step by step.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(handleAddQuestion, onError)}
          className="overflow-hidden border border-zinc-200 bg-white shadow-[0_18px_50px_rgba(0,0,0,0.055)]"
        >
          <div className="p-6 sm:p-9">

            {/* Question */}
            <section>
              <div className="mb-3 flex items-end justify-between">
                <div>
                  <p className="mb-1 text-xs font-medium uppercase tracking-[0.14em] text-zinc-400">
                    Step 01
                  </p>

                  <label className="text-[15px] font-semibold text-zinc-950">
                    Question
                  </label>
                </div>

                <span className="text-xs text-zinc-400">
                  Required
                </span>
              </div>

              <textarea
                {...register("question", {
                  required: "question is Required",
                  minLength: {
                    value: 6,
                    message: "question minium 6 character are Required",
                  },
                  maxLength: {
                    value: 50,
                    message: "question maximum 50 character are long",
                  },
                })}
                rows="5"
                placeholder="e.g. Explain how a B+ Tree works..."
                className="w-full resize-none border border-zinc-200 bg-zinc-50/50 px-4 py-4 text-[15px] leading-6 text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-950 focus:bg-white"
              />
            </section>

            {/* Difficulty */}
            <section className="mt-9 border-t border-zinc-100 pt-8">
              <div className="mb-3">
                <p className="mb-1 text-xs font-medium uppercase tracking-[0.14em] text-zinc-400">
                  Step 02
                </p>

                <label className="text-[15px] font-semibold text-zinc-950">
                  Difficulty
                </label>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                {["Easy", "Medium", "Hard"].map((item) => (
                  <button
                    key={item}
                    type="button"
                    value={item}
                    onClick={(e) =>
                      setCredentials({
                        ...credentials,
                        difficulty: e.target.value,
                      })
                    }
                    className={`relative h-12 border text-sm font-medium transition ${
                      credentials.difficulty === item
                        ? "border-zinc-950 bg-zinc-950 text-white"
                        : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-400 hover:bg-zinc-50"
                    }`}
                  >
                    {item}

                    {credentials.difficulty === item && (
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs">
                        ✓
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </section>

            {/* Status */}
            <section className="mt-9 border-t border-zinc-100 pt-8">
              <div className="mb-3">
                <p className="mb-1 text-xs font-medium uppercase tracking-[0.14em] text-zinc-400">
                  Step 03
                </p>

                <label className="text-[15px] font-semibold text-zinc-950">
                  Status
                </label>
              </div>

              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                {["Pending", "In Progress", "Complete"].map((item) => (
                  <button
                    key={item}
                    type="button"
                    value={item}
                    onClick={(e) =>
                      setCredentials({
                        ...credentials,
                        status: e.target.value,
                      })
                    }
                    className={`relative h-12 border px-3 text-sm font-medium transition ${
                      credentials.status === item
                        ? "border-zinc-950 bg-zinc-950 text-white"
                        : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-400 hover:bg-zinc-50"
                    }`}
                  >
                    {item}

                    {credentials.status === item && (
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs">
                        ✓
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </section>

            {/* Category */}
            <section className="mt-9 border-t border-zinc-100 pt-8">
              <div className="mb-3">
                <p className="mb-1 text-xs font-medium uppercase tracking-[0.14em] text-zinc-400">
                  Step 04
                </p>

                <label className="text-[15px] font-semibold text-zinc-950">
                  Category
                </label>
              </div>

              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                {["DSA", "Technical Interview", "Git" , 'Machine Coding'].map((item) => (
                  <button
                    key={item}
                    type="button"
                    value={item}
                    onClick={(e) =>
                      setCredentials({
                        ...credentials,
                        category: e.target.value,
                      })
                    }
                    className={`relative h-12 border px-3 text-sm font-medium transition ${
                      credentials.category === item
                        ? "border-zinc-950 bg-zinc-950 text-white"
                        : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-400 hover:bg-zinc-50"
                    }`}
                  >
                    {item}

                    {credentials.category === item && (
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs">
                        ✓
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </section>
          </div>

          {/* Bottom action */}
          <div className="flex items-center justify-between gap-4 border-t border-zinc-200 bg-zinc-50/70 px-6 py-5 sm:px-9">
            <p className="hidden text-xs text-zinc-400 sm:block">
              Your question will be added to your practice library.
            </p>

            <button
              type="submit"
              className="h-12 w-full bg-zinc-950 px-7 text-sm font-semibold text-white transition hover:bg-zinc-800 active:scale-[0.99] sm:w-auto"
            >
              Add Question
              <span className="ml-2">→</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddQuestion;
