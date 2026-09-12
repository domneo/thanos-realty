import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { getSavedProperties } from "utils/cartAPI";

import { CookieBanner } from "components/layout/CookieBanner";
import Footer from "components/layout/Footer";
import Header from "components/layout/Header";

import { SavedListingsContext } from "./SavedListingsContext";

interface SavedListingProperty {
  property_id: string;
  property: {
    title: string;
    slug: string;
  };
}

interface LayoutProps {
  children?: React.ReactNode;
  mode: "light" | "dark";
  menu: any;
}

export default function Layout({ children, mode, menu }: LayoutProps) {
  useEffect(() => {
    // Set unique uuid to each user in localStorage
    if (localStorage.getItem("session_id") === null) {
      localStorage.setItem("session_id", uuidv4());
    }
  });

  const [savedProperties, setSavedProperties] = useState<
    {
      property_id: string;
      title: string;
      slug: string;
    }[]
  >([]);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    // Get Saved Properties on initial load
    getSavedProperties({
      session_id: localStorage.getItem("session_id") || "",
    }).then((res) => {
      const savedListingsData = res.data?.properties?.data.map(
        (property: SavedListingProperty) => ({
          property_id: property.property_id || "",
          title: property.property.title,
          slug: property.property.slug,
        })
      );
      setSavedProperties(savedListingsData || []);
    });
  }, []);

  useEffect(() => {
    // Update Saved Properties
    if (isUpdating) {
      getSavedProperties({
        session_id: localStorage.getItem("session_id") || "",
      }).then((res) => {
        const savedListingsData = res.data?.properties?.data.map(
          (property: SavedListingProperty) => ({
            property_id: property.property_id || "",
            title: property.property.title,
            slug: property.property.slug,
          })
        );
        setSavedProperties(savedListingsData || []);
        setIsUpdating(false);
      });
    }
  }, [isUpdating]);

  return (
    <SavedListingsContext.Provider
      value={{
        saved: savedProperties,
        count: savedProperties?.length || 0,
        update: () => setIsUpdating(true),
      }}
    >
      <Header mode={mode} menu={menu} />
      {children}
      <Footer />
      <CookieBanner />
    </SavedListingsContext.Provider>
  );
}
