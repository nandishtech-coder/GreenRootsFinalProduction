import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSiteSettings, updateSiteSettings } from "@/lib/settings.functions";
import { Route as rootRoute } from "@/routes/__root";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { CustomLoader } from "@/components/ui/custom-loader";

export function MaintenanceManager() {
  const queryClient = useQueryClient();
  const { settings: initialSettings } = rootRoute.useLoaderData();

  const { data: settings, isLoading } = useQuery({
    queryKey: ["site_settings"],
    queryFn: () => getSiteSettings(),
    initialData: initialSettings,
  });

  const [heading, setHeading] = useState("");
  const [message, setMessage] = useState("");
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  useEffect(() => {
    if (settings) {
      setHeading(settings.maintenance_heading);
      setMessage(settings.maintenance_message);
      setMaintenanceMode(settings.maintenance_mode);
    }
  }, [settings]);

  const updateMutation = useMutation({
    mutationFn: updateSiteSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site_settings"] });
      toast.success("Settings updated successfully");
    },
    onError: (error) => {
      toast.error(`Error updating settings: ${error.message}`);
    }
  });

  const handleSave = () => {
    updateMutation.mutate({ data: { maintenance_mode: maintenanceMode, maintenance_heading: heading, maintenance_message: message } });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <div className="scale-75 origin-top">
          <CustomLoader text="" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Maintenance Mode</h2>
        <p className="text-muted-foreground">Enable or disable website maintenance mode and customize the screen.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Configuration</CardTitle>
          <CardDescription>
            When maintenance mode is active, visitors will only see the maintenance screen. The admin dashboard remains accessible.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-2">
            <Switch 
              id="maintenance-mode" 
              checked={maintenanceMode}
              onCheckedChange={setMaintenanceMode}
            />
            <Label htmlFor="maintenance-mode" className="text-lg">Enable Maintenance Mode</Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="heading">Maintenance Heading</Label>
            <Input 
              id="heading" 
              value={heading} 
              onChange={(e) => setHeading(e.target.value)} 
              placeholder="E.g. Website Under Maintenance"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Maintenance Message</Label>
            <Textarea 
              id="message" 
              value={message} 
              onChange={(e) => setMessage(e.target.value)} 
              placeholder="E.g. We are currently updating our website. Please check back later."
              rows={4}
            />
          </div>

          <Button 
            onClick={handleSave} 
            disabled={updateMutation.isPending}
            className="w-full sm:w-auto"
          >
            {updateMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : "Save Settings"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
