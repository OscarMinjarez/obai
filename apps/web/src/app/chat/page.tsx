import { Button } from '@obai/shared/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@obai/shared/components/ui/card';
import { Input } from '@obai/shared/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@obai/shared/components/ui/avatar';

export default function ChatPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-2xl h-[80vh] flex flex-col">
        <CardHeader className="border-b">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>OB</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>Obai</CardTitle>
              <p className="text-sm text-muted-foreground">Always here for you.</p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="flex w-full justify-end">
            <div className="bg-primary text-primary-foreground p-3 rounded-lg max-w-[80%] rounded-tr-none">
              Hello! This is a test message from me.
            </div>
          </div>
          
          <div className="flex w-full justify-start">
            <div className="bg-muted p-3 rounded-lg max-w-[80%] rounded-tl-none">
              Hi there! I am Obai. Your persistent memory and smart context is ready to be connected via WebSockets.
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="border-t p-4">
          <form className="flex w-full gap-2 items-center">
            <Input className="flex-1" placeholder="Type your message..." />
            <Button type="submit">Send</Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
