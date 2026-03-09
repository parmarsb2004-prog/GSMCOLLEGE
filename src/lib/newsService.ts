import { supabase } from "@/supabaseClient";

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

const uploadImage = async (file?: File | null) => {
  if (!file) return { imageUrl: undefined as string | undefined, imagePath: undefined as string | undefined };

  const imagePath = `news/${Date.now()}-${file.name}`;
  const { data, error } = await supabase.storage.from("news").upload(imagePath, file);
  if (error) {
    throw error;
  }
  const {
    data: { publicUrl },
  } = supabase.storage.from("news").getPublicUrl(data.path);
  const imageUrl = publicUrl;
  return { imageUrl, imagePath };
};

export const fetchNews = async (): Promise<NewsItem[]> => {
  const { data, error } = await supabase
    .from("news")
    .select("id, title, description, imageUrl, imagePath, publishedAt, createdAt, updatedAt")
    .order("publishedAt", { ascending: false });

  if (error) {
    throw error;
  }

  return (
    data?.map((row) => ({
      id: row.id,
      title: row.title || "",
      description: row.description || "",
      imageUrl: row.imageUrl || undefined,
      imagePath: row.imagePath || undefined,
      publishedAt: row.publishedAt ? new Date(row.publishedAt) : new Date(),
      createdAt: row.createdAt ? new Date(row.createdAt) : undefined,
      updatedAt: row.updatedAt ? new Date(row.updatedAt) : undefined,
    })) ?? []
  );
};

export const createNews = async (payload: NewsPayload): Promise<NewsItem> => {
  const now = new Date();
  const { imageUrl, imagePath } = await uploadImage(payload.imageFile || undefined);

  const { data, error } = await supabase
    .from("news")
    .insert({
      title: payload.title,
      description: payload.description,
      imageUrl: imageUrl || null,
      imagePath: imagePath || null,
      publishedAt: (payload.publishedAt || now).toISOString(),
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    })
    .select("id")
    .single();

  if (error) {
    throw error;
  }

  return {
    id: data.id,
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
      await supabase.storage.from("news").remove([existing.imagePath]).catch(() => undefined);
    }
  }

  const update = {
    title: payload.title,
    description: payload.description,
    imageUrl: imageUrl || null,
    imagePath: imagePath || null,
    publishedAt: payload.publishedAt.toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const { error } = await supabase.from("news").update(update).eq("id", id);
  if (error) {
    throw error;
  }

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
    await supabase.storage.from("news").remove([item.imagePath]).catch(() => undefined);
  }
  await supabase.from("news").delete().eq("id", item.id);
};
