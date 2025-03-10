interface LoadingDotsProps {
  text?: string;
}

export const LoadingDots: React.FC<LoadingDotsProps> = ({ text = "Procesando" }) => {
  return (
    <div className="loading-dots">
      {text}
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};