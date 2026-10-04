import { roadmap } from "@/lib/product-data";
export function Roadmap() {
  return (
    <section id="roadmap" className="section container">
      <div className="section-heading">
        <div>
          <p className="eyebrow">A CLEAR DIRECTION. AN HONEST START.</p>
          <h2>
            Built foundations.
            <br />A clear next chapter.
          </h2>
        </div>
        <p>
          Implemented does not mean commercially released.
          <br />
          Here is what exists, what is unfinished, and what we’re exploring.
        </p>
      </div>
      <div className="roadmap-grid">
        {roadmap.map((item, i) => (
          <article key={item.title}>
            <span className="roadmap-number">0{i + 1}</span>
            <span
              className={`roadmap-status ${item.status === "Implemented" ? "building" : ""}`}
            >
              <span />
              {item.status}
            </span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
