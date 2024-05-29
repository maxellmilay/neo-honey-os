import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"

import { cn } from "../../../lib/utils"
import { toggleVariants } from "src/frontend/components/ui/toggle"

const ToggleGroupContext = React.createContext({
  size: "default",
  variant: "default",
})

const ToggleGroup = React.forwardRef(({ className, variant, size, children, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cn("flex items-center justify-center gap-1", className)}
    {...props}>
    <ToggleGroupContext.Provider value={{ variant, size }}>
      {children}
    </ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
))

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName

const ToggleGroupItem = React.forwardRef(({ className, children, variant, size, value, running, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext);
  const [isActive, setIsActive] = React.useState(false);

  // React.useEffect(() => {
  //   // Update active state based on `running` prop
  //   if (!running) {
  //     setIsActive(false);
  //   }
  // }, [running]);

  // const handleClick = (event) => {
  //   if (!props.disabled || isActive) {
  //     if (!isActive || !running) {
  //       props.onClick(event);
  //       setIsActive(!isActive);
  //     }
  //   }
  // };

  React.useEffect(() => {
    // Ensure the item stays active if it's running or paused
    if (!running) {
      setIsActive(false);
    }
  }, [running]);

  const handleClick = (event) => {
    if (!props.disabled || isActive) {
      if (!isActive || !running) {
        props.onClick(event);
        setIsActive(!isActive);
      }
    }
  };

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(toggleVariants({
        variant: context.variant || variant,
        size: context.size || size,
      }), className)}
      value={value}
      {...props}
      onClick={handleClick}
      disabled={props.disabled && !isActive}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
});

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

export { ToggleGroup, ToggleGroupItem }
