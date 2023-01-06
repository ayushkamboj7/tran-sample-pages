import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function Home() {
  const router = useRouter();
  const token = router.query.token;
  const email = router.query.email;

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!router.isReady) return;

    let data = JSON.stringify({
      email: email,
      token: token,
    });

    let config = {
      method: "post",
      url: "https://traninnovation.com/api/account/confirmation",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response: any) {
        console.log("sdfhbsdh");
        console.log(response);
        setMessage(response.data.msg);
      })
      .catch(function (error) {
        console.log(error);
        setError(error);
      });
  }, [router.isReady]);
  if (message) {
    return (
      <section className=" flex justify-center flex-col items-center bg-[#449eff] h-screen">
        <div className=" mt-[100px] flex flex-col items-center">
          <h2 className="text-[#fff] text-[1.5rem] text-center">{message}</h2>
        </div>
      </section>
    );
  } else if (error) {
    return (
      <section className=" flex justify-center flex-col items-center bg-[#449eff] h-screen">
        <div className=" mt-[100px] flex flex-col items-center">
          <h2 className="text-[#fff] text-[1.5rem] text-center">
            Something went wrong !
          </h2>
        </div>
      </section>
    );
  } 
}
