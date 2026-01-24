import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card } from "./ui/card";
import Image from "next/image";

const ImageTabs = () => {
  return (
    <section className="py-16 flex items-center justify-center">
      <div>
        <Tabs defaultValue="img1">
          <TabsList>
            <TabsTrigger value="img1">Organize Applications</TabsTrigger>
            <TabsTrigger value="img2">Get Hired</TabsTrigger>
            <TabsTrigger value="img3">Manage Boards</TabsTrigger>
          </TabsList>
          <TabsContent value="img1">
            <Card>
              <div className="flex items-center justify-center h-full">
                <Image
                  src={"/hero-images/hero1.png"}
                  alt="hero1"
                  width={1200}
                  height={800}
                />
              </div>
            </Card>
          </TabsContent>
          <TabsContent value="img2">
            <Card>
              <div className="flex items-center justify-center h-full">
                <Image
                  src={"/hero-images/hero2.png"}
                  alt="hero2"
                  width={1200}
                  height={800}
                />
              </div>
            </Card>
          </TabsContent>
          <TabsContent value="img3">
            <Card>
              <div className="flex items-center justify-center h-full">
                <Image
                  src={"/hero-images/hero3.png"}
                  alt="hero3"
                  width={1200}
                  height={800}
                />
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default ImageTabs;
