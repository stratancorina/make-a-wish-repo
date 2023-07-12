import FormPeople from "./FormPeople";
import FormGift from "./FormGift";
import FormCalendar from "./FormCalendar";
import FormMessage from "./FormMessage";
import FormLocation from "./FormLocation";
import FormMore from "./FormMore";
import useFormContext from "../hooks/useFormContext";

const FormInputs = () => {

    const {page } = useFormContext()

    const display = {
        0: <FormPeople/>,
        1: <FormGift/>,
        2: <FormCalendar/>,
        3: <FormMessage/>,
        4: <FormLocation/>,
        5: <FormMore/>
    }

    const content = (
        <div>
            {display[page]}
        </div>
    )
  return content
}

export default FormInputs
