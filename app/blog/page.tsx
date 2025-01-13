'use client'

import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { blogPosts } from './blogData'

const BlogContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 8rem 2rem;

  @media (max-width: 768px) {
    padding: 4rem 1rem;
  }
`

const Title = styled.h1`
  font-weight: 800;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, ${({ theme }) => theme.colors.primary} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`

const BlogCard = styled.article`
  background: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid ${({ theme }) => theme.colors.primary};
  height: 450px;

  &:hover {
    transform: translateY(-5px);
  }
`

const BlogImage = styled.div`
  width: 100%;
  height: 200px;
  background-color: ${({ theme }) => theme.colors.secondary};
  background-size: cover;
  background-position: center;
`

const BlogContent = styled.div`
  padding: 1.5rem;
`

const BlogTitle = styled.h2`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.2;
  margin-bottom: 0.5rem;
`

const BlogExcerpt = styled.p`
  color: ${({ theme }) => theme.colors.secondary};
  margin: 1rem 0;
  line-height: 1.6;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`

const BlogMeta = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.secondary};
`

export default function BlogPage() {
  return (
    <BlogContainer>
      <Title>Latest Blog Posts</Title>
      <BlogGrid>
        {blogPosts.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.id}>
            <BlogCard>
              <BlogImage style={{ backgroundImage: `url(${post.imageUrl})` }} />
              <BlogContent>
                <BlogTitle>{post.title}</BlogTitle>
                <BlogExcerpt>{post.excerpt}</BlogExcerpt>
                <BlogMeta>{post.date}</BlogMeta>
              </BlogContent>
            </BlogCard>
          </Link>
        ))}
      </BlogGrid>
    </BlogContainer>
  )
}