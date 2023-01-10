CREATE DATABASE "linkr";

\c linkr;

CREATE TABLE "users"(
	"id" SERIAL PRIMARY KEY NOT NULL,
	"name" VARCHAR(30) NOT NULL,
	"email" TEXT UNIQUE NOT NULL,
	"password" TEXT NOT NULL,
	"picture_url" TEXT NOT NULL,
	"created_at" TIMESTAMP DEFAULT NOW()
);

ALTER TABLE "users" ADD CONSTRAINT "chk_email" CHECK ("email" LIKE '%_@__%.__%');

CREATE TABLE "posts"(
	"id" SERIAL PRIMARY KEY NOT NULL,
	"user_id" INTEGER NOT NULL,
	"description" TEXT,
	"url" TEXT NOT NULL,
	"created_at" TIMESTAMP DEFAULT NOW()
);

ALTER TABLE "posts" ADD CONSTRAINT "fk_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id");

CREATE TABLE "hashs"(
	"id" SERIAL PRIMARY KEY NOT NULL,
	"name" VARCHAR(20) NOT NULL,
	"post_id" INTEGER NOT NULL,
	"created_at" TIMESTAMP DEFAULT NOW()
);

ALTER TABLE "hashs" ADD CONSTRAINT "chk_name0" CHECK ("name" NOT LIKE '% %');
ALTER TABLE "hashs" ADD CONSTRAINT "fk_post_id" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON UPDATE CASCADE ON DELETE CASCADE;

CREATE TABLE "likes"(
	"id" SERIAL PRIMARY KEY NOT NULL,
	"user_id" INTEGER NOT NULL,
	"post_id" INTEGER NOT NULL,
	"created_at" TIMESTAMP DEFAULT NOW()
);

ALTER TABLE "likes" ADD CONSTRAINT "fk_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;
ALTER TABLE "likes" ADD CONSTRAINT "fk_post_id" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE;

CREATE TABLE "followers"(
	"id" SERIAL PRIMARY KEY NOT NULL,
	"user_id" INTEGER NOT NULL,
	"followed_id" INTEGER NOT NULL,
	"created_at" TIMESTAMP DEFAULT NOW ()
);

ALTER TABLE "followers" ADD CONSTRAINT "fk_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;
ALTER TABLE "followers" ADD CONSTRAINT "fk_followed_id" FOREIGN KEY ("followed_id") REFERENCES "users"("id") ON DELETE CASCADE;
ALTER TABLE "followers" ADD CONSTRAINT "chk_user_follower" CHECK ("user_id" <> "followed_id");
ALTER TABLE "followers" ADD CONSTRAINT "unique_user_follower" UNIQUE ("user_id", "followed_id");

CREATE TABLE "comments"(
	"id" SERIAL PRIMARY KEY NOT NULL,
	"user_id" INTEGER NOT NULL,
	"post_id" INTEGER NOT NULL,
	"comment" TEXT NOT NULL,
	"created_at" TIMESTAMP DEFAULT NOW ()
);

ALTER TABLE "comments" ADD CONSTRAINT "fk_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;
ALTER TABLE "comments" ADD CONSTRAINT "fk_post_id" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE;

CREATE TABLE "reposts"(
	"id" SERIAL PRIMARY KEY NOT NULL,
	"user_id" INTEGER NOT NULL,
	"post_id" INTEGER NOT NULL,
	"created_at" TIMESTAMP DEFAULT NOW ()
);

ALTER TABLE "reposts" ADD CONSTRAINT "fk_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;
ALTER TABLE "reposts" ADD CONSTRAINT "fk_post_id" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE;
