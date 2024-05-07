import { json, LoaderFunctionArgs } from '@remix-run/node';

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const quizLevel = url.searchParams.get('quizLevel');
  const category = params.category;

  console.log(quizLevel);
  console.log(category);

  return json({ quizLevel });
};

export default function Layout() {
  return '';
}
