import { useRouter } from "next/router";
import axios from "axios";

const formSubmitted = (event: any, token: any) => {
  event.preventDefault();
  var data = JSON.stringify({
    newPassword: event.target.password.value,
  });

  var config = {
    method: "post",
    url: `https://traninnovation.com/api/reset/password/${token}`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      if (response.data === "success") {
        alert("Password Changed");
      } else {
        alert(response.data.msg);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};

export default function ForgotPassword() {
  const router = useRouter();
  return (
    <section className=" flex justify-center flex-col items-center bg-[#449eff] h-screen">
      <div className="flex flex-col items-center">
        <h2 className="text-[#fff] text-[1.5rem]  text-center">
          Forgot Password
        </h2>
      </div>
      <form
        onSubmit={(event) => formSubmitted(event, router.query.token)}
        className="mt-[30px] mb-[15px] min-w-[30%]"
      >
        <input
          className="block w-full h-[50px] outline-none my-[25px] pl-4 rounded-md"
          type="password"
          placeholder="Enter Password"
          required
          name="password"
        />

        <input
          className="block w-full h-[50px] outline-none my-[25px] pl-4 rounded-md"
          type="password"
          placeholder="Enter password again "
          required
          name="password-again"
        />

        <button className="block my-0 mx-auto bg-[#fff] text-[#449eff] px-[40px] py-[10px] mt-[30px] rounded mx-auto">
          Reset Password
        </button>
      </form>
    </section>
  );
}
