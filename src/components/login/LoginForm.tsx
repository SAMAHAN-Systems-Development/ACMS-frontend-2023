'use client';
import * as Form from '@radix-ui/react-form';

const LoginForm = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <h1 className="font-semibold text-lg">Login Form</h1>
      <Form.Root className="FormRoot mt-4" action="/auth/login" method="post">
        <Form.Field className="FormField flex flex-col" name="email">
          <Form.Label className="FormLabel font-semibold">Email</Form.Label>
          <Form.Message
            className="FormMessage text-xs font-light text-red-500"
            match="valueMissing"
          >
            Please enter your Email
          </Form.Message>
          <Form.Control asChild>
            <input
              className="Input mt-2 border-2 rounded"
              type="text"
              required
            />
          </Form.Control>
        </Form.Field>

        <Form.Field className="FormField flex flex-col mt-4" name="password">
          <Form.Label className="FormLabel font-semibold">Password</Form.Label>
          <Form.Message
            className="FormMessage text-xs font-light text-red-500"
            match="valueMissing"
          >
            Please enter your password
          </Form.Message>
          <Form.Control asChild>
            <input
              className="Input mt-2 border-2 rounded"
              type="password"
              required
            />
          </Form.Control>
        </Form.Field>
        <Form.Submit asChild>
          <button className="Button px-2 py-1 bg-slate-900 rounded hover:bg-purple-600 text-white mt-4">
            Login
          </button>
        </Form.Submit>
      </Form.Root>
    </div>
  );
};

export default LoginForm;
