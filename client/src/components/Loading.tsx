

export default function Loading() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0.2)] w-screen h-screen flex justify-center items-center">
      <div className="lds-default">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
