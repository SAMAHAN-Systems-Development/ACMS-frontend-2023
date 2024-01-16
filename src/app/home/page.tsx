const Home = () => {
  return (
    <form>
      <button formAction="/auth/logout" formMethod="post">
        Logout
      </button>
    </form>
  );
};

export default Home;
