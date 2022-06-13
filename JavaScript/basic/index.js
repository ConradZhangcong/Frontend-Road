function func() {
  const guang = "guang";
  function func2() {
    const ssh = "ssh";
    function func3() {
      const suzhe = "suzhe";
      console.log(guang);
      console.log(ssh);
      console.log(suzhe);
    }
    return func3;
  }
  return func2;
}
