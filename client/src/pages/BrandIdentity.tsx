import Navigation from "@/components/Navigation";

export default function BrandIdentity() {
  return (
    <div style={{ backgroundColor: "#ebe6dc", minHeight: "100vh" }}>
      <Navigation />
      <main style={{ paddingTop: "76px" }}>
        <iframe
          title="BIND Immobilien Brand Identity"
          src="/brand/bind-immobilien-identity.html"
          style={{
            display: "block",
            width: "100%",
            minHeight: "calc(100vh - 76px)",
            border: 0,
            backgroundColor: "#ebe6dc",
          }}
        />
      </main>
    </div>
  );
}
