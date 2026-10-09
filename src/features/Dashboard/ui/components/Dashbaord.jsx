import useDashboard from "../../hooks/useDashbaord";
import { useDispatch } from "react-redux";
import { updatePageAndQuestions } from "../../state/dashboardState";
const Dashboard = () => {
  const { navigate, allQuestions, interview, DSA, progress, machine } =
    useDashboard();

  const dispatch = useDispatch();

  return (
    <div className="min-h-screen bg-[#f7f7f5] text-zinc-950">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Top Header */}
        <header className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-400">
              Interview Practice
            </p>

            <h1 className="text-3xl font-medium tracking-[-0.045em] sm:text-4xl">
              Dashboard
            </h1>

            <p className="mt-2 text-sm text-zinc-500">
              Keep track of what you’ve practiced and what’s left.
            </p>
          </div>

          <button
            onClick={() => navigate("/add-question")}
            className="w-fit bg-zinc-950 px-5 py-3 text-xs font-semibold text-white transition hover:bg-zinc-800"
          >
            + Add question
          </button>
        </header>

        {/* Overview Stats */}
        <section className="grid gap-px overflow-hidden border border-zinc-200 bg-zinc-200 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white p-5 sm:p-6">
            <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-zinc-400">
              Total Questions
            </p>

            <div className="mt-4 flex items-end justify-between">
              <span className="text-3xl font-medium tracking-[-0.04em]">
                {allQuestions.length}
              </span>

              <span className="text-[10px] text-zinc-400">All categories</span>
            </div>
          </div>

          <div className="bg-white p-5 sm:p-6">
            <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-zinc-400">
              Completed DSA
            </p>

            <div className="mt-4 flex items-end justify-between">
              <span className="text-3xl font-medium tracking-[-0.04em]">
                {
                  allQuestions.filter((qs) => {
                    return qs.category === "DSA" && qs.status === "Complete";
                  }).length
                }
              </span>

              <span className="text-[10px] text-zinc-400">
                of {allQuestions.filter((qs) => qs.category === "DSA").length}{" "}
                DSA
              </span>
            </div>
          </div>

          <div className="bg-white p-5 sm:p-6">
            <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-zinc-400">
              Completed Technical Interview
            </p>

            <div className="mt-4 flex items-end justify-between">
              <span className="text-3xl font-medium tracking-[-0.04em]">
                {
                  allQuestions.filter((qs) => {
                    return (
                      qs.category === "Technical Interview" &&
                      qs.status === "Complete"
                    );
                  }).length
                }
              </span>

              <span className="text-[10px] text-zinc-400">
                of{" "}
                {
                  allQuestions.filter((qs) => {
                    return qs.category === "Technical Interview";
                  }).length
                }{" "}
                technical Interview
              </span>
            </div>
          </div>

          <div className="bg-white p-5 sm:p-6">
            <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-zinc-400">
              Completed Machine Coding
            </p>

            <div className="mt-4 flex items-end justify-between">
              <span className="text-3xl font-medium tracking-[-0.04em]">
                {
                  allQuestions.filter((Qs) => {
                    return (
                      Qs.category === "Machine Coding" &&
                      Qs.status === "Complete"
                    );
                  }).length
                }
              </span>

              <span className="text-[10px] text-zinc-400">
                of{" "}
                {
                  allQuestions.filter((qs) => {
                    return qs.category === "Machine Coding";
                  }).length
                }{" "}
                Machine Coding
              </span>
            </div>
          </div>
        </section>

        {/* Main Grid */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
          {/* Left */}
          <div className="space-y-6">
            {/* Overall Progress */}
            <section className="border border-zinc-200 bg-white p-6 sm:p-7">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-zinc-400">
                    Overall Progress
                  </p>

                  <h2 className="mt-3 text-3xl font-medium tracking-[-0.04em]">
                    {Math.round(progress.progress)}%
                  </h2>

                  <p className="mt-1 text-xs text-zinc-400">
                    {progress.length} of {allQuestions.length} questions
                    completed
                  </p>
                </div>
              </div>

              <div className="mt-7 h-2 w-full bg-zinc-100">
                <div
                  className="h-full bg-zinc-950 transition-all duration-500"
                  style={{ width: `${Math.round(progress.progress)}%` }}
                />
              </div>

              <div className="mt-4 flex justify-between text-[10px] text-zinc-400">
                <span>Started</span>
                <span>{Math.round(progress.progress)}% complete</span>
                <span>Ready</span>
              </div>
            </section>

            {/* Recent Questions */}
            <section className="border border-zinc-200 bg-white">
              <div className="flex items-center justify-between border-b border-zinc-100 px-6 py-5">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-zinc-400">
                    Practice
                  </p>

                  <h2 className="mt-1 text-lg font-medium tracking-[-0.025em]">
                    Questions you’ve practiced
                  </h2>
                </div>

                <button
                  onClick={() => {
                    navigate("/questions");
                    dispatch(updatePageAndQuestions(0));
                  }}
                  className="text-xs font-medium text-zinc-500 hover:text-zinc-950"
                >
                  View all →
                </button>
              </div>

              <div className="divide-y divide-zinc-100">
                {allQuestions.slice(0, 4).map((qs, index) => {
                  return (
                    <div
                      key={index}
                      className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">
                          {qs.question}
                        </p>

                        <div className="mt-2 flex items-center gap-2 text-[10px] text-zinc-400">
                          <span>{qs.category}</span>
                          <span>{qs.difficulty}</span>
                        </div>
                      </div>

                      <span className="w-fit border border-zinc-200 bg-zinc-50 px-2.5 py-1.5 text-[10px] font-medium text-zinc-600">
                        {qs.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <section className="border border-zinc-200 bg-white p-6">
              <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-zinc-400">
                Progress
              </p>

              <h2 className="mt-2 text-lg font-medium tracking-[-0.025em]">
                Completion by category
              </h2>

              <div className="mt-6 space-y-5">
                <div>
                  <div className="mb-2 flex justify-between text-xs">
                    <span className="font-medium">DSA</span>
                    <span className="text-zinc-400">
                      {DSA.length > 0
                        ? Math.round(
                            (DSA.filter((qs) => {
                              return qs.status === "Complete";
                            }).length /
                              DSA.length) *
                              100,
                          )
                        : 0}
                    </span>
                  </div>

                  <div className="h-1.5 bg-zinc-100">
                    <div
                      className="h-full bg-zinc-950"
                      style={{
                        width: `${Math.floor(
                          (DSA.filter((qs) => qs.status === "Complete").length /
                            DSA.length) *
                            100,
                        )}%`,
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex justify-between text-xs">
                    <span className="font-medium">Technical</span>
                    <span className="text-zinc-400">
                      {interview.length > 0
                        ? Math.round(
                            (interview.filter((qs) => {
                              return qs.status === "Complete";
                            }).length /
                              interview.length) *
                              100,
                          )
                        : 0}
                    </span>
                  </div>

                  <div className="h-1.5 bg-zinc-100">
                    <div
                      className="h-full bg-zinc-950"
                      style={{
                        width: `${Math.floor(
                          (interview.filter((qs) => qs.status === "Complete")
                            .length /
                            interview.length) *
                            100,
                        )}%`,
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex justify-between text-xs">
                    <span className="font-medium">Machine</span>
                    <span className="text-zinc-400">
                      {machine.length > 0
                        ? Math.round(
                            (machine.filter((qs) => {
                              return qs.status === "Complete";
                            }).length /
                              machine.length) *
                              100,
                          )
                        : 0}
                    </span>
                  </div>

                  <div className="h-1.5 bg-zinc-100">
                    <div
                      className="h-full bg-zinc-950"
                      style={{
                        width: `${Math.floor(
                          (machine.filter((qs) => qs.status === "Complete")
                            .length /
                            machine.length) *
                            100,
                        )}%`,
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex justify-between text-xs">
                    <span className="font-medium">Git</span>
                    <span className="text-zinc-400">
                      {machine.length > 0
                        ? Math.round(
                            (allQuestions.filter((qs) => {
                              return (
                                qs.status === "Complete" &&
                                qs.category === "Git"
                              );
                            }).length /
                              allQuestions.filter((qs) => qs.category === "Git")
                                .length) *
                              100,
                          )
                        : 0}
                    </span>
                  </div>

                  <div className="h-1.5 bg-zinc-100">
                    <div
                      className="h-full bg-zinc-950"
                      style={{
                        width: `${Math.floor(
                          (allQuestions.filter(
                            (qs) =>
                              qs.category === "Git" && qs.status === "Complete",
                          ).length /
                            allQuestions.filter((qs) => qs.category === "Git")
                              .length) *
                            100,
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        <section className="mt-6 border border-zinc-200 bg-white p-6 sm:p-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-zinc-400">
                Next focus
              </p>

              <h2 className="mt-2 text-lg font-medium tracking-[-0.025em]">
                Complete your pending questions.
              </h2>

              <p className="mt-1 text-xs text-zinc-400">
                You currently have{" "}
                {
                  allQuestions.filter((qs) => {
                    return qs.status === "Pending";
                  }).length
                }{" "}
                questions waiting to be completed.
              </p>
            </div>

            <button
              onClick={() => navigate("/pending")}
              className="w-fit border border-zinc-200 bg-white px-4 py-2.5 text-xs font-medium text-zinc-700 transition hover:border-zinc-950 hover:text-zinc-950"
            >
              View pending →
            </button>
          </div>
        </section>

        {/* Footer */}
        <div className="mt-5 flex items-center justify-between text-[10px] text-zinc-400">
          <span>Interview Practice Tracker</span>
          <span>Stay consistent.</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
