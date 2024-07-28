"use client"

//refactored everything to Layout component to build practice mode branch
import Layout from "./_components/layout"

const Fib: React.FC = () => {
  return <Layout gameMode={"regular"} />
}

export default Fib
