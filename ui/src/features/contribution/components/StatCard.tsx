interface StatCardProps {

    icon: React.ReactNode;

    title: string;

    value: string;

}

export function StatCard({
                      icon,
                      title,
                      value,
                  }: StatCardProps){

    return(

        <div className="rounded-xl border bg-background p-5">

            <div className="mb-3 flex items-center gap-2 text-primary">

                {icon}

                <span className="text-sm font-medium">

                    {title}

                </span>

            </div>

            <p className="text-lg font-semibold">

                {value}

            </p>

        </div>

    )

}