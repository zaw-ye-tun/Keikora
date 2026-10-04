/* eslint-disable @next/next/no-img-element -- Supplied PNG bytes must be served directly; no image transformation or client image runtime is needed. */

export function WorkflowSymbol({
  light = false,
  animated = false,
  eager = false,
  className = "",
}: {
  light?: boolean;
  animated?: boolean;
  eager?: boolean;
  className?: string;
}) {
  return (
    <img
      src="/brand/keikora_logo.png"
      alt=""
      width={589}
      height={464}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      fetchPriority="low"
      className={`workflow-mark ${light ? "workflow-mark-on-dark" : ""} ${animated ? "workflow-mark-animated" : ""} ${className}`}
    />
  );
}

export function KeikoraLogo({
  light = false,
  eager = false,
}: {
  light?: boolean;
  eager?: boolean;
}) {
  return (
    <span className={`logo ${light ? "logo-light" : ""}`}>
      <WorkflowSymbol light={light} eager={eager} />
      <img
        src="/brand/keikora_text.png"
        alt="Keikora — Orchestrating service work"
        width={1042}
        height={372}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        fetchPriority="low"
        className="logo-wordmark"
      />
    </span>
  );
}
