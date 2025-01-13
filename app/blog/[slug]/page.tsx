'use client'

import React from 'react'
import styled from 'styled-components'
import { useParams } from 'next/navigation'
import { blogPosts } from '../blogData'

const ArticleContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 8rem 2rem;

  @media (max-width: 768px) {
    padding: 4rem 1rem;
  }
`

const Title = styled.h1`
  font-weight: 800;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.text};
`

const Meta = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 2rem;
`

const Content = styled.div`
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.text};

  p {
    margin-bottom: 1.5rem;
  }

  h2 {
    margin: 2rem 0 1rem;
    color: ${({ theme }) => theme.colors.text};
  }

  ul {
    margin-bottom: 1.5rem;
    padding-left: 1.5rem;

    li {
      margin-bottom: 0.5rem;
    }
  }
`

const HeroImage = styled.div`
  width: 100%;
  height: 400px;
  background-size: cover;
  background-position: center;
  margin-bottom: 2rem;
  border-radius: 8px;
`

export default function BlogPost() {
  const params = useParams()
  const post = blogPosts.find((post: { slug: string }) => post.slug === params.slug)

  if (!post) {
    return <div>Post not found</div>
  }

  return (
    <ArticleContainer>
      <Title>{post.title}</Title>
      <Meta>{post.date}</Meta>
      <HeroImage style={{ backgroundImage: `url(${post.imageUrl})` }} />
      <Content dangerouslySetInnerHTML={{ __html: post.content }} />
    </ArticleContainer>
  )
}