"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { workflow, demoRecord } from "@/lib/product-data";
import { RecordScene } from "./record-scene";
import { WorkflowRail } from "@/components/brand/workflow-rail";
export function Workflow() {
  const [active, setActive] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const current = useRef(0);

  useEffect(() => {
    const trackNode = track.current;
    const stageNode = stage.current;
    if (!trackNode || !stageNode) return;
    let frame = 0;
    let stickyTop = 0;
    let lastProgress = -1;
    const update = () => {
      frame = 0;
      const distance = trackNode.offsetHeight - stageNode.offsetHeight;
      if (stageNode.offsetHeight === 0 || distance <= 0) return;
      const progress = Math.max(
        0,
        Math.min(
          1,
          (stickyTop - trackNode.getBoundingClientRect().top) / distance,
        ),
      );
      if (progress !== lastProgress) {
        trackNode.style.setProperty("--workflow-progress", String(progress));
        trackNode.style.setProperty(
          "--assignment-progress",
          String(Math.max(0, Math.min(1, progress * workflow.length - 2))),
        );
        lastProgress = progress;
      }
      const next = Math.min(
        workflow.length - 1,
        Math.floor(progress * workflow.length),
      );
      if (next !== current.current) {
        current.current = next;
        setActive(next);
      }
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    const resize = () => {
      stickyTop = Number.parseFloat(getComputedStyle(stageNode).top) || 0;
      schedule();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(trackNode);
    observer.observe(stageNode);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", resize);
    resize();
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  const selectStep = (index: number) => {
    const trackNode = track.current;
    const stageNode = stage.current;
    if (!trackNode || !stageNode) return;
    const top = Number.parseFloat(getComputedStyle(stageNode).top) || 0;
    const start = window.scrollY + trackNode.getBoundingClientRect().top - top;
    const distance = trackNode.offsetHeight - stageNode.offsetHeight;
    current.current = index;
    setActive(index);
    window.scrollTo({
      top: start + distance * ((index + 0.35) / workflow.length),
      behavior: "instant",
    });
  };

  return (
    <section
      id="workflow"
      aria-label="How it works"
      className="section workflow-section scroll-workflow"
    >
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">HOW IT WORKS</p>
            <h2>
              One booking.
              <br />
              Connected operations.
            </h2>
          </div>
          <p>
            Different people. One operational record.
            <br />A workflow derived from the implemented system.
            <span className="workflow-scroll-hint">
              <ArrowDown size={14} aria-hidden="true" /> Scroll to follow the
              work
            </span>
          </p>
        </div>
        <div
          ref={track}
          className="workflow-track"
          style={{ "--workflow-count": workflow.length } as CSSProperties}
        >
          <div ref={stage} className="workflow-layout workflow-sticky">
            <div
              className="workflow-steps"
              role="group"
              aria-label="Workflow steps"
            >
              <WorkflowRail active={active} />
              {workflow.map(({ title }, i) => (
                <button
                  key={title}
                  aria-label={title}
                  aria-pressed={active === i}
                  aria-controls="workflow-preview"
                  className={`workflow-step ${active === i ? "selected" : ""} ${i < active ? "complete" : ""}`}
                  onClick={() => selectStep(i)}
                >
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <span className="workflow-step-label">{title}</span>
                  <ArrowRight size={16} />
                </button>
              ))}
            </div>
            <div
              id="workflow-preview"
              className="workflow-preview"
              role="region"
              aria-labelledby="workflow-scene-title"
            >
              <div className="preview-top">
                <span className="eyebrow">IMPLEMENTED WORKFLOW</span>
                <span className="badge">
                  Step {active + 1} of {workflow.length}
                </span>
              </div>
              <div className="workflow-record" data-stage={active}>
                <span className="workflow-record-code">{demoRecord.code}</span>
                <span>
                  {demoRecord.service}
                  <small>
                    {demoRecord.customer} · {demoRecord.date} · 09:00–11:00
                  </small>
                </span>
                <span className="workflow-record-link" aria-hidden="true">
                  <ArrowRight size={15} />
                </span>
              </div>
              <div className="workflow-scene" key={active}>
                <span className="workflow-role">{workflow[active].user}</span>
                <h3 id="workflow-scene-title">{workflow[active].title}</h3>
                <p>{workflow[active].text}</p>
                <RecordScene step={active} />
                <span className="badge workflow-record-state">
                  {workflow[active].state}
                </span>
              </div>
              <div className="progress-dots" aria-hidden="true">
                {workflow.map((_, i) => (
                  <span className={i <= active ? "filled" : ""} key={i} />
                ))}
              </div>
              <div className="workflow-scroll-meter" aria-hidden="true">
                <span />
              </div>
              <small className="concept-label">
                Illustrative record story · not live product actions
              </small>
            </div>
          </div>
        </div>
        <div className="workflow-linear">
          {workflow.map((step, index) => (
            <article className="workflow-chapter" key={step.title}>
              <span className="workflow-chapter-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <span className="workflow-role">{step.user}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
                <RecordScene step={index} />
                <span className="badge">{step.state}</span>
              </div>
            </article>
          ))}
        </div>
        <p className="workflow-story-note">
          One fictional booking illustrates these relationships. Availability is
          recorded independently; assignment is triggered by operations, and
          invoice preparation is a separate action.
        </p>
      </div>
    </section>
  );
}
