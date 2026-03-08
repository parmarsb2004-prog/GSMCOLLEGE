import { db, storage } from "@/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";

export type NewsItem = {
  id: string;
  title: string;
  description: string;
  publishedAt: Date;
  imageUrl?: string;
  imagePath?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type NewsPayload = {
  title: string;
  description: string;
  publishedAt: Date;
  imageFile?: File | null;
};

const collectionRef = collection(db, "news");

const uploadImage = async (file?: File | null) => {
  if (!file) return { imageUrl: undefined as string | undefined, imagePath: undefined as string | undefined };

  const imagePath = `news/${Date.now()}-${file.name}`;
  const storageRef = ref(storage, imagePath);
  await uploadBytes(storageRef, file);
  const imageUrl = await getDownloadURL(storageRef);
  return { imageUrl, imagePath };
};

export const fetchNews = async (): Promise<NewsItem[]> => {
  const q = query(collectionRef, orderBy("publishedAt", "desc"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((docSnap) => {
    const data = docSnap.data();
    return {
      id: docSnap.id,
      title: data.title || "",
      description: data.description || "",
      imageUrl: data.imageUrl,
      imagePath: data.imagePath,
      publishedAt: data.publishedAt?.toDate?.() || new Date(),
      createdAt: data.createdAt?.toDate?.(),
      updatedAt: data.updatedAt?.toDate?.(),
    } as NewsItem;
  });
};

export const createNews = async (payload: NewsPayload): Promise<NewsItem> => {
  const now = new Date();
  const { imageUrl, imagePath } = await uploadImage(payload.imageFile || undefined);

  const docRef = await addDoc(collectionRef, {
    title: payload.title,
    description: payload.description,
    imageUrl: imageUrl || null,
    imagePath: imagePath || null,
    publishedAt: Timestamp.fromDate(payload.publishedAt || now),
    createdAt: Timestamp.fromDate(now),
    updatedAt: Timestamp.fromDate(now),
  });

  return {
    id: docRef.id,
    title: payload.title,
    description: payload.description,
    imageUrl: imageUrl || undefined,
    imagePath: imagePath || undefined,
    publishedAt: payload.publishedAt || now,
    createdAt: now,
    updatedAt: now,
  };
};

export const updateNews = async (
  id: string,
  payload: NewsPayload,
  existing?: NewsItem | null
): Promise<NewsItem> => {
  let imageUrl = existing?.imageUrl;
  let imagePath = existing?.imagePath;

  if (payload.imageFile) {
    const uploaded = await uploadImage(payload.imageFile);
    imageUrl = uploaded.imageUrl;
    imagePath = uploaded.imagePath;

    if (existing?.imagePath) {
      await deleteObject(ref(storage, existing.imagePath)).catch(() => undefined);
    }
  }

  const update = {
    title: payload.title,
    description: payload.description,
    imageUrl: imageUrl || null,
    imagePath: imagePath || null,
    publishedAt: Timestamp.fromDate(payload.publishedAt),
    updatedAt: Timestamp.fromDate(new Date()),
  };

  await updateDoc(doc(collectionRef, id), update);

  return {
    id,
    title: payload.title,
    description: payload.description,
    imageUrl: imageUrl || undefined,
    imagePath: imagePath || undefined,
    publishedAt: payload.publishedAt,
    updatedAt: new Date(),
  };
};

export const deleteNews = async (item: NewsItem) => {
  if (item.imagePath) {
    await deleteObject(ref(storage, item.imagePath)).catch(() => undefined);
  }
  await deleteDoc(doc(collectionRef, item.id));
};
