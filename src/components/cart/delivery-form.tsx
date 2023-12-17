import { Package, Soup } from "lucide-react"
import { useState } from "react"
import Selectable from "./selectable"

const DeliveryForm = () => {
  const [selected, setSelected] = useState(null)

  return (
    <div className="col-span-2">
      <h2 className="inline-block whitespace-nowrap pb-5 text-lg font-semibold tracking-wide">
        Delivery Method
      </h2>
      <div className="w-full rounded-md border bg-white p-5 shadow-sm">
        <div className="flex w-full flex-row justify-evenly gap-4">
          <Selectable
            icon={Soup}
            name="Pickup"
            selected={selected}
            onSelect={setSelected}
          />
          <Selectable
            icon={Package}
            name="Delivery"
            selected={selected}
            onSelect={setSelected}
          />
        </div>
      </div>
    </div>
  )
}

export default DeliveryForm
