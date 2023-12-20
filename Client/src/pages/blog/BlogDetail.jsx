import React, { useEffect, useState } from 'react'
import './BlogDetail.css'
import { useParams } from 'react-router-dom';
import { getBlogById } from '../../utils/apiCalls';
import { apiDomain } from '../../utils/utilsDomain';
import ReactQuill from 'react-quill';
const BlogDetail = () => {
    const [data, setData] = useState([]);
    const param = useParams();


    const formatDateString = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
        return formattedDate;
    };
    const getBlog = async () => {
        const data = await getBlogById(param.slug);
        setData(data);
    }
    useEffect(() => {
        getBlog();
    }, [])
    return (
        <div className="container">

            <div className="cs-blog-detail">

                <div className="cs-main-post">
                    <figure>
                        <img src={apiDomain + "/image/" + data.img} alt="" />
                    </figure>
                </div>
                <div className="cs-post-title">
                    <h1 >{data.title}</h1>
                    <div className="post-option">

                        <span className="post-date"><a href="http://jobcareer.chimpgroup.com/jobdoor/2015/11/"><i class="cs-color icon-calendar6"></i>{formatDateString(data.date_create)}</a></span>
                    </div>
                </div>
                <div className="cs-post-option-panel">
                    <div className="rich-editor-text flex justify-center ">
                        <ReactQuill
                            theme="snow"
                            value={data.description}
                            readOnly={true}
                            modules={{ toolbar: null }}
                            className="quill-no-border border-none md:w-2/3"
                        />
                    </div>
                </div>
                <div className="cs-tags">
                    <div className="tags">
                        <span>Tags</span>
                        <ul>
                            <li><a rel="tag" href="http://jobcareer.chimpgroup.com/jobdoor/tag/college/">Làm đẹp</a></li>
                            <li><a rel="tag" href="http://jobcareer.chimpgroup.com/jobdoor/tag/job/">Mỹ phẩm</a></li>
                            <li><a rel="tag" href="http://jobcareer.chimpgroup.com/jobdoor/tag/search/">Phái đẹp</a></li>
                            <li><a rel="tag" href="http://jobcareer.chimpgroup.com/jobdoor/tag/teacher/">Nước hoa</a></li>
                        </ul>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default BlogDetail