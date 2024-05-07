import { TabsList, TabsTrigger } from 'app/@/components/ui/tabs';

export const LevelPickTab = () => {
  return (
    <TabsList className="flex gap-x-5">
      <TabsTrigger className="ml-2 w-full rounded-md" value="easy">
        Easy
      </TabsTrigger>
      <TabsTrigger className="w-full rounded-md" value="normal">
        Normal
      </TabsTrigger>
      <TabsTrigger className="mr-2 w-full rounded-md" value="hard">
        Hard
      </TabsTrigger>
    </TabsList>
  );
};
