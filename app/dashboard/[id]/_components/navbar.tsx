const Navbar = () => {
  return (
    <nav className="px-6 py-2 flex items-center gap-5 backdrop-blur-lg bg-background/60 border border-border">
      <h1 className="w-fit pr-3 font-bold text-xl border-r-2 border-primary border-dashed">
        Job Workshop Dashboard
      </h1>
      <div>Track the progress of your job applications</div>
    </nav>
  );
};

export default Navbar;
