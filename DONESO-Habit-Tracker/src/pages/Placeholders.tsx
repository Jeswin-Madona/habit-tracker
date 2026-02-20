import { Sidebar } from "@/components/Sidebar";

const PlaceholderPage = ({ title }: { title: string }) => {
    return (
        <div className="flex min-h-screen bg-background text-foreground font-sans">
            <Sidebar />
            <main className="flex-1 p-8">
                <h1 className="text-3xl font-bold tracking-tight text-slate-800 mb-1">{title}</h1>
                <p className="text-slate-500 font-medium">Coming soon!</p>
            </main>
        </div>
    );
};

export const Dashboard = () => <PlaceholderPage title="Dashboard" />;
export const Statistics = () => <PlaceholderPage title="Statistics" />;
export const Rewards = () => <PlaceholderPage title="Rewards" />;
export const Community = () => <PlaceholderPage title="Community" />;
export const Journal = () => <PlaceholderPage title="Journal" />;
export const Settings = () => <PlaceholderPage title="Settings" />;
export const Help = () => <PlaceholderPage title="Help Centre" />;
