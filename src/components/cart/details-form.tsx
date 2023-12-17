"use client"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { cartFormSchema } from "@/schema/cart"
import { UseFormReturn } from "react-hook-form"
import { z } from "zod"

interface DetailsFormProps {
  onSubmit: (values: z.infer<typeof cartFormSchema>) => void
  form: UseFormReturn<z.infer<typeof cartFormSchema>>
}

const DetailsForm = ({ form, onSubmit }: DetailsFormProps) => {
  const fieldNames = Object.keys(cartFormSchema.shape) as Array<
    keyof z.infer<typeof cartFormSchema>
  >
  return (
    <div className="col-span-2">
      <h2 className="inline-block whitespace-nowrap pb-5 text-lg font-semibold tracking-wide">
        Details
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          id="details"
          className="w-full rounded-md border bg-white p-5 shadow-sm"
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="col-span-3 flex flex-col md:flex-row">
              {fieldNames.slice(0, 3).map((name) => (
                <FormField
                  control={form.control}
                  name={name}
                  key={name}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="hidden">{name}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          label={name
                            .replace(/([A-Z])/g, " $1")
                            .replace(/^./, function (str) {
                              return str.toUpperCase()
                            })}
                          className="w-full rounded border p-2"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>
            <div className="col-span-3 flex flex-col md:flex-row">
              {fieldNames.slice(3).map((name) => (
                <FormField
                  control={form.control}
                  name={name}
                  key={name}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="hidden">{name}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          label={name
                            .replace(/([A-Z])/g, " $1")
                            .replace(/^./, function (str) {
                              return str.toUpperCase()
                            })}
                          className="w-full rounded border p-2"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default DetailsForm
