import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAppStore } from '@/hooks/use-app-state';
import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

export function LogViewer() {
  const { logs } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLogs = logs.filter(log => 
    JSON.stringify(log).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const clearLogs = () => {
    useAppStore.setState({ logs: [] });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search logs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button variant="outline" onClick={clearLogs}>
          Clear
        </Button>
      </div>

      <ScrollArea className="h-[600px] rounded-md border">
        {filteredLogs.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            No logs found
          </div>
        ) : (
          <div className="space-y-4">
          {logs.map((log, index) => (
            <div key={index} className="p-4 rounded-lg border-b">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Request {index + 1}</h3>
                <span className="text-sm text-muted-foreground">
                  {log.timestamp.toLocaleTimeString()}
                </span>
              </div>
              <pre className="text-sm bg-muted p-2 rounded overflow-x-auto">
                {JSON.stringify(log.request, null, 2)}
              </pre>
              <h3 className="font-medium my-2">Response</h3>
              <pre className="text-sm bg-muted p-2 rounded overflow-x-auto">
                {JSON.stringify(log.response, null, 2)}
              </pre>
            </div>
          ))}
        </div>
        )}
      </ScrollArea>
    </div>
  );
}