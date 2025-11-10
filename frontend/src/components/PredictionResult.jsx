function PredictionResult({ result }) {
  const { prediction, probability } = result;

  return (
    <div className="prediction-result" style={{ marginTop: "1rem" }}>
      <h3>
        Result:{" "}
        {prediction === 1 ? (
          <span style={{ color: "red" }}>Customer will churn</span>
        ) : (
          <span style={{ color: "green" }}>Customer will stay</span>
        )}
      </h3>
      <p>Confidence: {(probability * 100).toFixed(2)}%</p>
    </div>
  );
}

export default PredictionResult;
