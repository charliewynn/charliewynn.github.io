export const metadata = { title: "Workshop — Charlie Wynn" };

interface Model {
  title: string;
  thingId: string;
  blurb: string;
}

// Add models here: flip a Tinkercad design to Public, paste the share URL's
// ID (the part after tinkercad.com/things/) as thingId.
const MODELS: Model[] = [
  // Example: { title: "Drawer knob", thingId: "ABC123xyz", blurb: "Replacement knob for the kitchen drawer." },
];

function ModelEmbed({ model }: { model: Model }) {
  return (
    <figure className="model-embed">
      <iframe
        title={model.title}
        src={`https://www.tinkercad.com/embed/${model.thingId}`}
        loading="lazy"
        allowFullScreen
      />
      <figcaption>
        <strong>{model.title}.</strong> {model.blurb} Drag to rotate, scroll to zoom.
      </figcaption>
    </figure>
  );
}

export default function Workshop() {
  return (
    <div className="wrap">
      <section className="hero">
        <h1>Workshop</h1>
        <p className="lede">
          Dad-project 3D models — replacement parts, brackets, and little fixtures,
          designed in Tinkercad and printed at home. Drag any model to look around it.
        </p>
      </section>
      <section>
        {MODELS.length === 0 ? (
          <div className="empty">
            <h3>Models coming soon</h3>
            <p>
              The 3D gallery is being set up — each model will embed right here as an
              interactive viewer you can rotate and zoom.
            </p>
          </div>
        ) : (
          <div className="card-grid">
            {MODELS.map((m) => (
              <ModelEmbed key={m.thingId} model={m} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
