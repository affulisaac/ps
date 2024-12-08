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
          <div className="space-y-4 p-4">
            {filteredLogs.map((log, index) => (
              <div
                key={index}
                className="rounded-lg border bg-card text-card-foreground"
              >
                <div className="border-b bg-muted/40 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm">
                        #{filteredLogs.length - index}
                      </span>
                      <span className="text-sm font-medium">
                        {log.request.type?.toUpperCase()}
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {formatDistanceToNow(log.timestamp, { addSuffix: true })}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 divide-x">
                  <div className="p-4">
                    <h4 className="mb-2 text-sm font-medium">Request</h4>
                    <pre className="whitespace-pre-wrap text-sm">
                      {JSON.stringify(
                        {
                          type: log.request.type,
                          mobile: log.request.mobile,
                          message: log.request.message,
                          operator: log.request.operator,
                        },
                        null,
                        2
                      )}
                    </pre>
                  </div>
                  <div className="p-4">
                    <h4 className="mb-2 text-sm font-medium">Response</h4>
                    <pre className="whitespace-pre-wrap text-sm">
                      {JSON.stringify(
                        {
                          type: log.response.type,
                          message: log.response.message,
                          dataType: log.response.dataType,
                          data: log.response.data,
                        },
                        null,
                        2
                      )}
                    </pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}