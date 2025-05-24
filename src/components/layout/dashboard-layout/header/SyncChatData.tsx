import { Loader2, RefreshCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useChatSync } from "@/features/chat/hooks/useChatSync";
const SyncChatData = () => {
    const { syncDataMutation, isSyncing } = useChatSync();

    const handleSyncData = () => {
        syncDataMutation({ type: "all", limit: 100 });
    };

    return (
        <TooltipProvider delayDuration={100}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button onClick={handleSyncData} disabled={isSyncing} variant="ghost" className="h-8 w-8 rounded-full p-2">
                        {isSyncing ?
                            <Loader2 className="h-4 w-4 animate-spin" /> 
                    :
                    <RefreshCcw className="h-4 w-4" />
    
                        }
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Sync chat data</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default SyncChatData