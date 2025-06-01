import TutorDatail from "@/section/TutorDetails"

const Page = async (props) => {

    const {id} = await props.params

  return (
    <TutorDatail id={id}/>
  )
}

export default Page