export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen bg-black text-white bg-[radial-gradient(circle_at_left,_#0a0a23_1%,_black_100%)] bg-fixed">
      <section className="border-r-[1px] border-white/20 w-full center">
        <div className="flex flex-col items-start justify-center space-y-6 leading-none">
          <h1 className="text-2xl font-bold text-white/80">Momento</h1>
          <h2 className="text-6xl font-extrabold leading-none tracking-wide">
            Delightful
            <br />
            events
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">
              start here.
            </span>
          </h2>
          <p className="text-xl max-w-[25rem] text-white/80">
            Set up an event page, invite friends and sell tickets. Host a
            memorable event today.
          </p>
        </div>
      </section>
      {children}
    </div>
  );
}
