import backgroundImage from "@src/assets/images/background-image.png"
import { Button } from "@src/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@src/components/ui/card"
import { Checkbox } from "@src/components/ui/checkbox"
import { Pencil, Plus } from "lucide-react"

const Checkout = () => {
  return (
    <div 
    className="bg-cover bg-center min-h-screen h-full flex flex-col items-center navbar-spacing w-full " 
    style={{ backgroundImage: `url(${backgroundImage})` }}
  >
        <Card>
            <CardHeader>
                <CardTitle>Checkout Page</CardTitle>
                <CardDescription>Complete your purchase securely and effortlessly in just a few steps.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 sm:flex-row min-h-[400px] sm:min-w-[600px] md:min-w-[800px]" >
                <div className="flex flex-col gap-4 w-full ">
                    <Card className="p-4 flex items-center h-[100px] justify-center cursor-pointer">
                        <Plus />
                    </Card>
                    <Card className="p-4 flex items-center gap-4 max-h-[100px] ">
                        <Checkbox />
                        <div className="flex justify-between w-full">
                            <div>
                                <h1 className="font-semibold text-lg">Juan Dela Cruz</h1>
                                <p className="font-light text-sm text-muted-foreground">123 Balagbag Street Rizal</p>
                                <p className="font-light text-sm text-muted-foreground">09123456789</p>
                            </div>
                            <Pencil size={16} />
                        </div>
                    </Card>
                   
                </div>
                <Card className="p-4 sm:min-h-full w-full flex flex-col gap-4">
                    <CardHeader className="px-0 pt-1 sm:text-end">
                        <CardTitle>Checkout Summary</CardTitle>
                        <CardDescription className="text-yellow text-md">Subtotal: ₱1000</CardDescription>
                    </CardHeader>
                    <Card className="p-4 flex flex-col max-h-[100px]">
                        <h1 className="font-semibold text-lg">Leafy Vegetable</h1>
                        <p className="font-md text-sm text-yellow">Price: ₱500 </p>
                        <p className="font-light text-sm text-muted-foreground">Quantity: 3</p>
                        
                    </Card>
                    <Card className="p-4 flex flex-col max-h-[100px]">
                        <h1 className="font-semibold text-lg">Leafy Vegetable</h1>
                        <p className="font-md text-sm text-yellow">Price: ₱500 </p>
                        <p className="font-light text-sm text-muted-foreground">Quantity: 3</p>
                        
                    </Card>
                    <Card className="p-4 flex flex-col max-h-[100px]">
                        <h1 className="font-semibold text-lg">Leafy Vegetable</h1>
                        <p className="font-md text-sm text-yellow">Price: ₱500 </p>
                        <p className="font-light text-sm text-muted-foreground">Quantity: 3</p>
                        
                    </Card>
                </Card>            
            </CardContent>
            <CardFooter>
                <Button className="w-full">Proceed to Payment</Button>
            </CardFooter>
        </Card>
    </div>
  )
}

export default Checkout