import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="errorPage">
      <h1>Whoops! This is not what you were looking for</h1>
      <p>Swiper might steal the info and possibly your money!</p>
      <p>Sorry for the inconvenience caused.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <p>Please contact our detective <a href="mailto:csk.sakthi@gmail.com">Dora's</a> assistant!</p>
    </div>
  );
}