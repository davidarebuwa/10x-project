export default function handleError(error: Error) {
  let message = "Something went wrong";
  if (error instanceof Error) message = error.message;
  reportError({ message });
}
