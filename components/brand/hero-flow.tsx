import { WorkflowSymbol } from "./keikora-logo";

export function HeroFlow() {
  return (
    <div className="hero-flow">
      <WorkflowSymbol animated />
      <div>
        <span className="hero-flow-phrase">Orchestrating service work.</span>
        <div className="hero-flow-sequence">
          <span>Booking record</span>
          <i aria-hidden="true" />
          <span>Available time</span>
          <i aria-hidden="true" />
          <span>Assignment</span>
          <i aria-hidden="true" />
          <span>Assigned work</span>
        </div>
      </div>
    </div>
  );
}
