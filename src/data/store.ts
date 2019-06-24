import XmlCache from "./xml-cache";
import { Edition } from "./types";

/*
 * This class contains the application Store, which holds all the TEI data, as well as processed data.
 * We are not using a Redux store here to save time. In the future we might turn this into a Redux store.
 * In the mean time, we have a singleton store instance, which is passed to the root component of the application,
 * (although the singleton can just be accessed by any class)
 */

 class FvStoreClass {
     public readonly cache: XmlCache;
     public readonly editions: Edition[];
     public static instance = new FvStoreClass();

     private constructor() {
         this.cache = new XmlCache();
         this.editions = [
             new Edition('1818', '1818', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
             new Edition('1823', '1823', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
             new Edition('1831', '1831', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
             new Edition('Thomas', 'Thomas', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
             new Edition('MS', 'MS', [7, 8, 9, 10]),
         ]
     }
 }

 const FvStore = FvStoreClass.instance;
 export default FvStore;  // Everybody can just access FvStore.property