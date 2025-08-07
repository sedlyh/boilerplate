import React from 'react'
import {Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {LucideIcon, UserIcon} from "lucide-react";

const OrgCards = ({value, description, footerTitle, footerDescription, icon} :{value: string, description: string, footerTitle: string, footerDescription: string, icon: LucideIcon} ) => {
    return (
            <Card className="@container/card bg-white" >
                <CardHeader>
                    <CardDescription>
                        <p className=" text-xs uppercase">
                            {description}
                        </p>
                    </CardDescription>
                    <CardAction className="text-right pb-0">
                        <Badge variant="outline">
                            {React.createElement(icon)}
                        </Badge>
                    </CardAction>
                    <CardTitle>
                        <h3 className="text-2xl font-semibold  tabular-nums @[250px]/card:text-3xl">{value}</h3>
                    </CardTitle>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="line-clamp-1 flex gap-2  font-medium">
                        {footerTitle}
                    </div>
                    <div className="text-muted-foreground">
                        {footerDescription}
                    </div>
                </CardFooter>
            </Card>
    )
}
export default OrgCards
