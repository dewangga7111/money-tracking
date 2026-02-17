import { tv } from 'tailwind-variants';

export const subtitle = tv({
  base: "w-full md:w-1/2 my-2 text-lg lg:text-xl text-default-600 block max-w-full",
  variants: {
    fullWidth: {
      true: "!w-full",
    },
  },
  defaultVariants: {
    fullWidth: true,
  },
});

export const actionButtons = tv({
  base: "flex gap-2 sm:justify-end max-sm:w-full max-sm:mt-5"
})

export const button = tv({
  base: "sm:max-w-[120px] max-sm:w-full"
})

export const form = tv({
  base: "w-full flex flex-col gap-4"
})

export const inputContainer = tv({
  base: "grid lg:grid-cols-3 gap-4"
})

