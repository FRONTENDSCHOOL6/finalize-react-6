export default function Logo() {
  return (
    <div className="flex flex-col items-center justify-center m-8">
      <img
        src="https://frontendschool6.github.io/finalize-react-6/logo.png"
        alt="logo"
        className="w-36"
      />
      <h1 className="text-darkblue font-bold text-xl">
        당신의 제주를
        <br />
        우리의 제주로
      </h1>
    </div>
  );
}

export const SubLogo = () => {
  return (
    <div className="flex gap-3 items-center justify-center m-8">
      <img
        src="https://frontendschool6.github.io/finalize-react-6/logo.png"
        alt="logo"
        className="w-32"
      />
      <p className="text-darkblue font-bold text-lg">
        당신의 제주를
        <br />
        우리의 제주로
      </p>
    </div>
  );
};
