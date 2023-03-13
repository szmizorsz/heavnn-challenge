import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import Posts from "@/components/posts";
import Users from "@/components/users";

export default function Home() {
  return (
    <Tabs>
      <TabList>
        <Tab>Posts</Tab>
        <Tab>Users</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Posts />
        </TabPanel>
        <TabPanel>
          <Users />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
